import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Link to="/dashboard/edit">Editar Canal</Link>
    </div>
  );
};

export default Dashboard;
