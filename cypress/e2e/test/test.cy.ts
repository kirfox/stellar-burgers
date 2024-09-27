describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:5173', function() {
        cy.visit('http://localhost:4000'); 
    });

    it('добавление ингредиента из списка в конструктор', function() {
        cy.visit('http://localhost:4000'); 

        const bun = cy.get(`[data-cy=643d69a5c3f7b9001cfa093c]`).find('button').click();
        const ingridient = cy.get(`[data-cy=643d69a5c3f7b9001cfa0941]`).find('button').click();
    });


    it('открытие/закрытие модального окна ингридиента', function() {
        cy.visit('http://localhost:4000'); 

        const modal = cy.get(`[data-cy=643d69a5c3f7b9001cfa093c]`).find('a').click();
        const button = cy.get(`[data-cy=closeModal]`).click();
    });
}); 
