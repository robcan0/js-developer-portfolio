// Seleciona todos os botões com a classe "trigger" dentro de elementos com a classe "accordion"
const triggers = document.querySelectorAll('.accordion .trigger');

// Percorre cada botão encontrado
triggers.forEach((trigger, index) => {
  // Pega o próximo elemento irmão do botão (o conteúdo do acordeão)
  const content = trigger.nextElementSibling;
  if (!content) return; // Se não houver conteúdo, sai da função

  // Cria um ID único para cada conteúdo do acordeão
  const contentId = `accordion-content-${index}`;
  content.id = contentId;

  // Define atributos de acessibilidade (ARIA)
  trigger.setAttribute('aria-controls', contentId); // Relaciona o botão ao conteúdo
  trigger.setAttribute('aria-expanded', 'false');   // Indica que o conteúdo está fechado

  // Função para fechar todos os acordeões
  function closeAll() {
    document.querySelectorAll('.accordion').forEach(acc => {
      acc.classList.remove('open'); // Remove a classe "open" (fecha)
      const t = acc.querySelector('.trigger');
      if (t) t.setAttribute('aria-expanded', 'false'); // Atualiza acessibilidade
    });
  }

  // Função para abrir/fechar o acordeão atual
  function toggle() {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true'; // Verifica se já está aberto
    closeAll(); // Fecha todos antes de abrir o atual
    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true'); // Marca como aberto
      trigger.closest('.accordion').classList.add('open'); // Adiciona classe "open" ao acordeão
    }
  }

  // Adiciona evento de clique ao botão
  trigger.addEventListener('click', toggle);

  // Adiciona suporte ao teclado (Enter ou Espaço)
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Evita comportamento padrão (scroll da página)
      toggle();           // Executa a função de abrir/fechar
    }
  });
});