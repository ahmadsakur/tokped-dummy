import { useQuery } from "@apollo/client";
import { MY_QUERY } from "@/lib/graphql/query";
import Button from "@/components/Button";
import { colors } from "@/utils/colors";
import { LuSettings2 } from "react-icons/lu";
import { FlexContainer } from "@/components/utility/layout";

const MyComponent = () => {
  const { loading, error, data } = useQuery(MY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div>
      <FlexContainer>
        <Button color={colors.sunglow}>
          <LuSettings2 />
        </Button>
      </FlexContainer>
    </div>
  );
};

export default MyComponent;
