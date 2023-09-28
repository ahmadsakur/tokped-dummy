import React from 'react';
import { useQuery } from '@apollo/client';
import { MY_QUERY } from '@/lib/graphql/query';

const MyComponent = () => {
  const { loading, error, data } = useQuery(MY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div>
      {/* Render your data here */}
    </div>
  );
};

export default MyComponent;
