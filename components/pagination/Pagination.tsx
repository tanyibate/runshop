function PreviousButton({ onClick, isActive }) {
  return (
    <button
      className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      type="button"
      disabled={!isActive}
    >
      Previous
    </button>
  );
}

function NextButton({ onClick, isActive }) {
  return (
    <button
      className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={!isActive}
    >
      Next
    </button>
  );
}

export default function Pagination(props: {
  offset: number;
  limit: number;
  total: number;
  setOffset: (offset: number) => void;
}) {
  const { offset, limit, total, setOffset } = props;
  const previousButtonIsActive = offset > limit;
  const nextButtonIsActive = offset + limit < total;
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3 ">
      <div className="flex flex-1 justify-between sm:hidden">
        <PreviousButton
          isActive={previousButtonIsActive}
          onClick={() => console.log("click")}
        />
        <NextButton
          isActive={nextButtonIsActive}
          onClick={() => console.log("click")}
        />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{total ? offset + 1 : 0} </span> to
            <span className="font-medium">
              {" "}
              {total >= limit ? limit + offset : total}
            </span>{" "}
            of
            <span className="font-medium"> {total}</span> results
          </p>
        </div>
        <div>
          <div className="flex">
            <PreviousButton
              isActive={previousButtonIsActive}
              onClick={() => setOffset(offset - limit)}
            />
            <NextButton
              isActive={nextButtonIsActive}
              onClick={() => setOffset(offset + limit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
