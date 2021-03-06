import React, { useEffect } from 'react';

import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer.js';
import EachVillageBlock from '../components/TotalVillages/EachVillageBlock.js';
import TotalVillagesHeader from '../components/TotalVillages/TotalVillagesHeader.js';
import useFetchPublishedPage from '../firebase/hooks/useFetchPublishedPage.js';
import { primaryYellow } from '../styles/styledComponents/color.js';

const Container = styled.div`
  margin: 0px auto;
  max-width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-row-gap: 3rem;
  grid-column-gap: 3rem;
  grid-auto-rows: minmax(200px, 250px);
`;

const TotalTitle = styled.h3`
  width: 150px;
  margin: 130px 0px 50px 20vw;
  border-bottom: 2px solid #363636;
  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const TotalVillages = () => {
  const { publishedVillages, fetchError, fetchLoading } =
    useFetchPublishedPage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TotalVillagesHeader />
      <TotalTitle>鄰里總覽</TotalTitle>
      {fetchLoading ? (
        <div
          style={{ width: '20vw', margin: '45vh auto', textAlign: 'center' }}
        >
          <BeatLoader
            size={20}
            color={`${primaryYellow}`}
            loading={fetchLoading}
            speedMultiplier={0.8}
          />
        </div>
      ) : null}
      <Container>
        {fetchError && <p>存取資料錯誤:{fetchError}</p>}

        {!fetchLoading &&
          publishedVillages?.map(({ id, cityName, villageName, heroImage }) => (
            <EachVillageBlock
              key={id}
              id={id}
              cityName={cityName}
              villageName={villageName}
              heroImage={heroImage}
            />
          ))}
      </Container>
      <div style={{ height: '300px' }} />
      <Footer />
    </>
  );
};
export default TotalVillages;
