const PageTitle = ({ title, action }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      {action}
    </div>
  );
};

export default PageTitle;