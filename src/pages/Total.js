import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header.js';
import EachVillageBlock from '../components/Total/EachVillageBlock.js';
import useFetchPublishedPage from '../firebase/hooks/useFetchPublishedPage.js';

const Container = styled.div`
  margin: 5vh auto;
  max-width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1.5em;
  grid-auto-rows: minmax(200px, auto);
`;

const Total = () => {
  const { publishedVillages, fetchError } = useFetchPublishedPage();
  return (
    <>
      <Header />

      {fetchError && <p>存取資料錯誤:{fetchError}</p>}
      <Container>
        {publishedVillages?.map(({ id, cityName, villageName, heroImage }) => (
          <EachVillageBlock
            key={id}
            id={id}
            cityName={cityName}
            villageName={villageName}
            heroImage={heroImage}
          />
        ))}
      </Container>
    </>
  );
};
export default Total;
