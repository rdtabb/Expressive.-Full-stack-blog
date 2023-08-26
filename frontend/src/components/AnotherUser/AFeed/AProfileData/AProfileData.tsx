type PropsType = {
  username: string | undefined;
  status: string | undefined;
  isLoading: boolean;
};

const AProfileData = ({ username, status, isLoading }: PropsType) => {
  if (isLoading) {
    console.log("Loading userdata");
  }
  return (
    <article>
      <p
        style={{
          fontSize: "3.5rem",
        }}
      >
        {username}
      </p>
      <p
        style={{
          fontSize: "1.5rem",
        }}
      >
        {status}
      </p>
    </article>
  );
};

export default AProfileData;
