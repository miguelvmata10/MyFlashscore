import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchSearchData } from '../../services/SearchService';
import SearchResultsList from './SearchResultsList';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import { Container } from 'react-bootstrap';

const SearchResults = () => {
    const { type, inputValue } = useParams();
    const [ page, setPage ] = useState(1);

    const { data: searchData, loading, error, fetchData } = useApiRequest(fetchSearchData);

    useEffect(() => {
      if (type && inputValue) {
        setPage(1); // reset para quando se muda de input
        fetchData(type, inputValue);  
      }
    }, [type, inputValue, fetchData]);

    // apenas no caso de pesquisa do jogador é que há paginação
    useEffect(() => {
      if (type === "player") {
        fetchData(type, inputValue, page);
      }
    }, [page])
   
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!searchData || searchData.length === 0 ) return <NotFound />;

    return (
      <Container>
        <SearchResultsList data={searchData} type={type} setPage={setPage} />
      </Container>
    )
}
export default SearchResults