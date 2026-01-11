// Função assíncrona que busca os dados do perfil em um arquivo JSON
async function fetchProfileData() {
  try {
    const url = 'data/profile.json'; // Caminho do arquivo JSON com os dados do perfil
    const response = await fetch(url); // Faz a requisição HTTP para buscar o arquivo

    // Verifica se a resposta foi bem-sucedida (status 200–299)
    if (!response.ok) {
      // Se não for bem-sucedida, lança um erro com o código HTTP
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    // Converte a resposta para objeto JavaScript (JSON)
    return await response.json();
  } catch (error) {
    // Caso ocorra algum erro (rede, arquivo não encontrado, etc.)
    console.error('Falha ao buscar dados do perfil:', error);
    return null; // Retorna null para indicar falha
  }
}