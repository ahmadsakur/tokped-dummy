import toast from "react-hot-toast";

const Favourite = () => {
  const handletoast = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      duration: 2000,
    });
  };
  return <button onClick={handletoast}>Click</button>;
};

export default Favourite;
