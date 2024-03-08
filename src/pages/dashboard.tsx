export default function Dashboard() {
  const items = [];

  for (let i = 0; i < 30; i++) {
    const element = 'ddddddddddd' + [i];
    items.push(element);
  }

  return (
    <>
      dashboard <br />
      {items.map((e) => {
        return <p>{e}</p>;
      })}
    </>
  );
}
