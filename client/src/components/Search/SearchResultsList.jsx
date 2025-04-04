import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import ElementCard from '../CommonUI/ElementCard';
import NotFound from '../CommonUI/NotFound';
import './SearchStyles.css';

const SearchResultsList = ({ data, type, setPage }) => {

    const renderData = () => {
        const results = data[type];

        if ( !results || results.length === 0 ) return <NotFound />;

        return (
            <Row className="g-3">
              {results.map((item) => {
                switch (type) {
                  case 'player':
                    return (
                      <Col key={item.player.id} md={6}>
                        <ElementCard
                          role="player"
                          id={item.player.id}
                          photo={item.player.photo}
                          name={item.player.name}
                          number={item.player.number}
                          age={item.player.age}
                        />
                      </Col>
                    );
                  case 'coach':
                    return (
                      <Col key={item.id} md={6}>
                        <ElementCard
                          role="coach"
                          id={item.id}
                          photo={item.photo}
                          name={item.name}
                        />
                      </Col>
                    );
                  case 'club':
                    return (
                      <Col key={item.team.id} md={6}>
                        <ElementCard
                          role="team"
                          id={item.team.id}
                          photo={item.team.logo}
                          name={item.team.name}
                        />
                      </Col>
                    );
                  case 'competition':
                    return (
                      <Col key={item.league.id} md={6}>
                        <ElementCard
                          role="league"
                          id={item.league.id}
                          photo={item.league.logo}
                          name={item.league.name}
                        />
                      </Col>
                    );
                  default:
                    return null;
                }
              })}
            </Row>
        );
    };

    const renderPagination = () => {
        if (!data.pagination) return null;

        const { currentPage, totalPages } = data.pagination;

        if (totalPages <= 1) return null; 

        let active = Number(currentPage);

        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => setPage(number)} className='pagination-dark'>
                    {number}
                </Pagination.Item>,
            );
        }

        return (
            <div className="d-flex justify-content-center mt-4">
                <Pagination size="md" className="pagination-dark">
                    <Pagination.Prev disabled={currentPage == 1} onClick={() => setPage(currentPage - 1)} className="pagination-dark-nav" />
                        {items}
                    <Pagination.Next disabled={currentPage == totalPages} onClick={() => setPage(currentPage + 1)} className="pagination-dark-nav"/>
                </Pagination>
            </div>
        );
    };

    return (
        <div>
            <h4 className='mb-4 heading-border'>Resultados</h4>
            {renderData()}
            {renderPagination()}
        </div>
    )
}
export default SearchResultsList