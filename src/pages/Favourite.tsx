import { ChangeEvent, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import CustomInput from "@/components/Input";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "@/lib/graphql/query";
import { TContact } from "@/utils/queryType";

export default function Favourite() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST);

  useEffect(() => {
    refetch({
      where: {
        _or: [
          { first_name: { _like: `%${debouncedValue}%` } },
          { last_name: { _like: `%${debouncedValue}%` } },
          { phones: { number: { _like: `%${debouncedValue}%` } } },
        ],
      },
    });
  }, [debouncedValue]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <CustomInput
        icon={<BsSearch />}
        id="search-input"
        type="text"
        value={value}
        onValueChange={handleChange}
      />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <p>Contacts:</p>
            <ul>
              {data.contact.map((contact: TContact) => (
                <li key={contact.id}>
                  {contact.first_name} {contact.last_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
