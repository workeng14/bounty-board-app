import {
  Apply,
  ArrowLineDown,
  ArrowLineup,
  CreateAcc,
  Explore,
  UploadCv,
} from "../../../../src copy/assets/LandingPage";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create account",
      description: "Sign up in seconds and set up your profile.",
      icon: <CreateAcc />,
      active: false,
    },
    {
      title: "Upload CV/Resume",
      description:
        "Show off your skills and experience to potential collaborators.",
      icon: <UploadCv />,
      active: true,
    },
    {
      title: "Explore Bounties",
      description: "Browse active projects looking for talent like you.",
      icon: <Explore />,
      active: false,
    },
    {
      title: "Apply or Post",
      description: "Apply to join a bounty — or create your own and find help.",
      icon: <Apply />,
      active: false,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="relative flex flex-col md:flex-row md:flex-wrap md:justify-center gap-10 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center w-full sm:w-3/4 md:w-64 mx-auto"
          >
            <div
              className={`rounded-lg px-6 py-5 w-full transition-all duration-300 ${
                step.active ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="text-gray-500 text-xs mt-2">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`hidden md:block absolute ${
                  index % 2 === 0 ? "-top-5" : "top-20"
                } right-[-55%] z-10`}
              >
                {index % 2 === 0 ? <ArrowLineup /> : <ArrowLineDown />}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
