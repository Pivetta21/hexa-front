import {
  PageLoader,
  PageLoaderCenter,
  PageLoaderContainer,
  PageLoaderText,
} from 'src/styled/Loaders';

const Loading: React.FC = () => {
  return (
    <PageLoaderContainer>
      <PageLoaderCenter>
        <PageLoaderText>
          Estamos carregando está página, aguarde!
        </PageLoaderText>
        <PageLoader />
      </PageLoaderCenter>
    </PageLoaderContainer>
  );
};

export default Loading;
