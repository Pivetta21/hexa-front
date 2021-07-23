import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'src/components/Loading';

interface Props {}

const Channel: React.FC<Props> = () => {
  const { id } = useParams() as any;
  const [isLoading, setIsLoading] = useState(true);

  async function fetchChannel() {
    console.log(id);

    setIsLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchChannel();
    }, 500);
  }, []);

  return (
    <Fragment>
      {!isLoading ? (
        <div className="main-padding">
          <div>Public Channel Component</div>
          <div>{id}</div>
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Channel;
