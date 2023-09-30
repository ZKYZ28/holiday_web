function FormContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full page-size bg-gray-100 flex justify-center items-center">
      <div className="w-4/5 lg:w-1/2 bg-white p-9 rounded-2xl box-shadow">
        <h2 className="text-3xl text-blue-800 font-bold mb-12">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default FormContainer;
