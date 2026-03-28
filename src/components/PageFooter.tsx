export const PageFooter = () => {
  return (
    <footer className="mt-5 mb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-around">
          <div className="text-sm font-medium text-gray-500 space-y-1 sm:flex-1 sm:text-center text-left">
            <p>
              {`DESIGNED AND DEVELOPED WITH ♥ IN ITHACA, NEW YORK. CORNELL APPDEV © ${new Date().getFullYear()}.`}
            </p>
            <p>
              REGISTERED ENGINEERING PROJECT TEAM OF CORNELL UNIVERSITY. SEE OUR{' '}
              <a
                href="https://www.cornellappdev.com/privacy"
                className="underline hover:text-gray-700"
              >
                PRIVACY POLICY
              </a>
              .
            </p>
            <a
              href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
              className="underline hover:text-gray-700"
            >
              <p>EQUAL EDUCATION AND EMPLOYMENT.</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
