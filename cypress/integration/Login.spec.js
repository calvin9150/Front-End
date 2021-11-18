describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("메인페이지에서 로그인 버튼 클릭", () => {
    cy.visit("/login");

    cy.contains("로그인")
      .click()
      .location("pathname")
      .should("equal", "/login");
  });

  it("회원가입 버튼 클릭", () => {
    cy.contains("회원가입")
      .click()
      .location("pathname")
      .should("equal", "/signup");
  });

  it("로그인페이지 아이디, 패스워드 입력 후 제출", () => {});
});
