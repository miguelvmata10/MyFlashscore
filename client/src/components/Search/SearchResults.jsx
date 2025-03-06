import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchSearchData } from '../../services/SearchService';
import SearchResultsList from './SearchResultsList';
import LoadingScreen from '../CommonUI/LoadingScreen';

const SearchResults = () => {
    const { name, inputValue } = useParams();

    const { data: searchData, loading, error, fetchData } = useApiRequest(fetchSearchData);

    useEffect(() => {
      if (name && inputValue) {
          fetchData(name, inputValue);  
      }
    }, [name, inputValue, fetchData]);
   
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!searchData) return <p>Nenhum dado disponível.</p>;

    return (
      <Container className='container p-5 rounded-4' >
        <SearchResultsList data={searchData} name={name}/>
      </Container>
    )
}
export default SearchResults