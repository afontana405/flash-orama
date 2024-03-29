import { useQuery } from '@apollo/client';

import Profile from './Profile';
import { QUERY_CARDS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CARDS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '2px solid #1a1a1a', borderRadius:"10px" }}
        >
          <Profile />
        </div>
      </div>
    </main>
  );
};

export default Home;
