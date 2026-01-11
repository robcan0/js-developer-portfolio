// Atualiza as informações principais do perfil (foto, nome, cargo, localização, telefone e email)
function updateProfileInfo(profileData) {
  const photo = document.getElementById('profile-photo');
  if (photo) {
    photo.src = profileData.photo || ''; // Define a foto do perfil
    photo.alt = profileData.name || 'Foto de Perfil'; // Texto alternativo para acessibilidade
  }

  const name = document.getElementById('profile-name');
  if (name) name.innerText = profileData.name || ''; // Define o nome no título

  document.title = `Portfólio de ${profileData.name}`; // Atualiza o título da aba do navegador

  const job = document.getElementById('profile-job');
  if (job) {
    job.innerText = profileData.job || ''; // Cargo
    job.href = profileData.jobLink || '#'; // Link para mais informações sobre o cargo
  }

  const location = document.getElementById('profile-location');
  if (location) {
    location.innerText = profileData.location || ''; // Localização
    location.href = profileData.locationLink || '#'; // Link para mapa ou referência
  }

  const phone = document.getElementById('profile-phone');
  if (phone) {
    phone.innerText = profileData.phone || ''; // Número de telefone
    // Cria link clicável para discagem (tel:) removendo caracteres não numéricos
    phone.href = profileData.phone ? `tel:+55${profileData.phone.replace(/\D/g, '')}` : '';
  }

  const email = document.getElementById('profile-email');
  if (email) {
    email.innerText = profileData.email || ''; // Endereço de email
    email.href = profileData.email ? `mailto:${profileData.email}` : ''; // Link para enviar email
  }

  // Se houver título específico no JSON, sobrescreve o título da aba
  if (profileData.title) {
    document.title = profileData.title;
  }
}

// Atualiza lista de soft skills (habilidades pessoais)
function updateSoftSkills(profileData) {
  const softSkills = document.getElementById('profile-skills-softSkills');
  if (!softSkills) return;

  // Cria lista <li> para cada habilidade
  softSkills.innerHTML = (profileData.skills?.softSkills || [])
    .map((skill) => `<li>${skill}</li>`)
    .join('');
}

// Atualiza lista de hard skills (ferramentas/tecnologias)
function updateHardSkills(profileData) {
  const hardSkills = document.getElementById('profile-skills-hardSkills');
  if (!hardSkills) return;

  // Cria lista com ícones das ferramentas
  hardSkills.innerHTML = (profileData.skills?.hardSkills || [])
    .map(
      (skill) =>
        `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`
    )
    .join('');
}

// Atualiza lista de idiomas
function updateLanguages(profileData) {
  const languages = document.getElementById('profile-languages');
  if (!languages) return;

  languages.innerHTML = (profileData.languages || [])
    .map((language) => `<li>${language}</li>`)
    .join('');
}

// Atualiza lista de projetos do portfólio
function updatePortfolio(profileData) {
  const portfolio = document.getElementById('profile-portfolio');
  if (!portfolio) return;
  portfolio.innerHTML = ''; // Limpa conteúdo anterior

  (profileData.portfolio || []).forEach((project) => {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    if (project.github) h3.classList.add('github'); // Adiciona ícone do GitHub se for projeto hospedado lá

    const a = document.createElement('a');
    a.href = project.url || '#'; // Link para o projeto
    a.target = '_blank'; // Abre em nova aba
    a.rel = 'noopener noreferrer'; // Segurança contra ataques de referência
    a.textContent = project.name || 'Projeto'; // Nome do projeto

    h3.appendChild(a);

    const p = document.createElement('p');
    p.className = 'description';
    p.textContent = project.description || ''; // Descrição do projeto

    li.appendChild(h3);
    li.appendChild(p);
    portfolio.appendChild(li);
  });
}

// Atualiza lista de experiências profissionais
function updateProfessionalExperience(profileData) {
  const professionalExperience = document.getElementById('profile-professional-experience');
  if (!professionalExperience) return;

  professionalExperience.innerHTML = (profileData.professionalExperience || [])
    .map((experience) => {
      return `
        <li>
          <p class="period">${experience.period}</p> <!-- Período da experiência -->
          <h3 class="title">${experience.name}</h3> <!-- Nome da empresa ou cargo -->
          <p>${experience.description}</p> <!-- Descrição da experiência -->
        </li>
      `;
    })
    .join('');
}

// Exibe mensagem de erro caso os dados não sejam carregados
function showLoadError(message = 'Não foi possível carregar os dados do perfil.') {
  const err = document.querySelector('.load-error');
  if (!err) return;
  err.textContent = message;
  err.hidden = false; // Torna visível a mensagem de erro
}

// Função autoexecutável (IIFE) que carrega os dados do perfil e atualiza a página
(async () => {
  const profileData = await fetchProfileData(); // Busca dados do JSON

  if (!profileData) {
    // Se não conseguir carregar, mostra mensagem de erro
    const main = document.querySelector('.main');
    const err = document.createElement('div');
    err.className = 'load-error';
    err.textContent = 'Não foi possível carregar os dados do perfil. Tente novamente mais tarde.';
    main.prepend(err); // Insere mensagem no topo do conteúdo
    console.error('Não foi possível carregar os dados');
    return;
  }

  // Atualiza todas as seções da página com os dados carregados
  updateProfileInfo(profileData);
  updateSoftSkills(profileData);
  updateHardSkills(profileData);
  updateLanguages(profileData);
  updatePortfolio(profileData);
  updateProfessionalExperience(profileData);
})();