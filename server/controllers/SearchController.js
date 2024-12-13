const apiFootballReq = require('../services/apiFootball');

// Endpoint unificado para buscar jogadores, treinadores, clubes ou competições
const searchEntity = async (req, res) => {
    const { type, inputValue } = req.params;
    const page = req.query.page || 1;

    // Mapear os tipos para os caminhos da API
    const endpointsMap = {
        Jogador: 'players/profiles',
        Treinador: 'coachs',
        Clube: 'teams',
        Competicao: 'leagues',
    };

    const endpoint = endpointsMap[type];

    if (!endpoint) {
        return res.status(400).json({ error: 'Tipo inválido. Apenas Jogador, Treinador, Clube ou Competição válidos.' });
    }

    try {
        // necessário pois apenas o endpoint para Jogador usa paginação
        const params = type === 'Jogador' ? { search: inputValue, page } : { search: inputValue };
        const data = await apiFootballReq(endpoint, params);

        // Caso não tenha dados, tratar no frontend 
        if (!data.response || data.response.length === 0) {
            return res.status(200).json({ 
                message: `Nenhum resultado encontrado para ${type} com o nome: ${inputValue}`,
                data: [] });
        }

        const response = {
            pagination: data.paging
                ? {
                    currentPage: page,
                    totalPages: data.paging.total,
                    totalResults: data.results,
                }
                : undefined,
        };

        // Adicionar os resultados específicos
        response[`${type.toLowerCase()}`] = data.response;

        res.status(200).json(response);
    } catch (error) {
        console.error(`Erro ao obter os dados para ${type}: `, error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    searchEntity,
};
