const EmployerDashboard = () => {
  const cardItems = [
    {
      title: "Card title 1",
      content: "lorem",
    },
    {
      title: "Card title 2",
      content: "Card content 2",
    },
    {
      title: "Card title 3",
      content: "Card content 3",
    },
    {
      title: "Card title 4",
      content: "Card content 4",
    },
  ];

  return (
    <div className="flex gap-10 p-4 flex-wrap items-center justify-center">
      {cardItems.map((cardItem) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="flex flex-col rounded-md shadow-md gap-6 p-4 w-100"
          >
            <h3>{cardItem.title}</h3>
            <p>{cardItem.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EmployerDashboard;
