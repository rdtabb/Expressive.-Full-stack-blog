type PropsType = {
  username: string | undefined;
  status: string | undefined;
  isLoading: boolean;
  isError: boolean;
};

const AProfileData = ({ username, status, isLoading, isError }: PropsType) => {
  if (isLoading) {
    console.log("Loading userdata");
  }
  return (
    <div>
      <p>{username}</p>
      <p>{status}</p>
    </div>
  );
};

export default AProfileData;
