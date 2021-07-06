import { Link } from 'react-router-dom';

import { NotFoundContainer, NotFoundImage, NotFoundText } from './styles';

import NotFoundError from 'src/assets/svg/illustrations/NotFoundError.svg';

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <NotFoundContainer className="main-padding">
      <NotFoundImage>
        <img src={NotFoundError} aria-label="No Found - 404" />
      </NotFoundImage>
      <NotFoundText>
        Não encontramos a página que você está procurando{' '}
        <Link to="/">clique aqui</Link> para voltar para o ínicio.
      </NotFoundText>
    </NotFoundContainer>
  );
};

export default NotFound;
