import "./PWDverification.css";

const PWDverification = ({
  capLetterFlag,
  numCheck,
  pwdLenghtCheck,
  specialcharCheck,
}) => {
  return (
    <div>
      <h1 className="text-gray-300">Must Contain:</h1>
      <p className={pwdLenghtCheck}>At least 8 characters</p>
      <p className={capLetterFlag}>A Capital letter</p>
      <p className={numCheck}>A numerical number</p>
      <p className={specialcharCheck}>A special character</p>
    </div>
  );
};

export default PWDverification;
