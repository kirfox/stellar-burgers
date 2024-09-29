beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit('http://localhost:4000')
    cy.get('h3').as('title');
    cy.get('div').as('container')
  });

  describe('добавление ингредиента из списка в конструктор', function () {
    it('Добавления ингридиента', function () {
      cy.get('@title')
        .contains('Соусы')
        .next('ul')
        .children()
        .first()
        .contains('Добавить')
        .click();
      cy.get('@container').contains('Выберите начинку').should('not.exist');
    });
  });


  describe('Открытие/закрытие модального окна ингридиента', function () {
    beforeEach(function () {
      cy.get('@title').contains('Булки').next('ul').children().first().click();
    });
    it('Открытие модального окна ингредиента', function () {
      cy.get('#modals').children().first().should('be.visible');
    });
  });
  describe('Закрытие модального окна', () => {
    beforeEach(function () {
      cy.get('@title').contains('Булки').next('ul').children().first().click();
    });
    it('Закрыть модальное окно по крестику', function () {
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
      cy.get('@container').contains('Детали ингредиента').should('not.exist');
    })
  });

  describe('Тестирование создания заказа', function () {
    beforeEach(function () {
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    });
    it('оформление заказа', function () {
      cy.get('@title')
        .contains('Булки')
        .next('ul')
        .children()
        .first()
        .contains('Добавить')
        .click();
      cy.get('@title')
        .contains('Начинки')
        .next('ul')
        .children()
        .first()
        .contains('Добавить')
        .click();
      cy.get('@container').contains('Выберите булки').should('not.exist');
      cy.get('@container').contains('Выберите начинку').should('not.exist');
      cy.get('button').contains('Оформить заказ').click();
      cy.get('#modals').should('not.be.empty');
      cy.get('#modals').find('h2').contains('12345').should('exist');
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
      cy.get('@container').contains('Выберите булки').should('exist');
      cy.get('@container').contains('Выберите начинку').should('exist');
    });
  });