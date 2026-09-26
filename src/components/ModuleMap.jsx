import ModuleCard from "./ModuleCard";

function ModuleMap({
  modules,
  completedChallengeIds = [],
  onSelectModule,
  onResetProgress,
}) {
  const getCompletedCount = (module) =>
    module.challenges.filter((challenge) =>
      completedChallengeIds.includes(challenge.id)
    ).length;

  const isModuleComplete = (module) =>
    getCompletedCount(module) ===
    module.challenges.length;

  const getModuleStatus = (module, index) => {
    if (isModuleComplete(module)) {
      return "complete";
    }

    if (index === 0) {
      return "available";
    }

    const previousModule = modules[index - 1];

    if (isModuleComplete(previousModule)) {
      return "available";
    }

    return "locked";
  };

  const totalSkills = modules.reduce(
    (total, module) =>
      total + module.challenges.length,
    0
  );

  const completedSkills = modules.reduce(
    (total, module) =>
      total + getCompletedCount(module),
    0
  );

  const overallProgress =
    totalSkills === 0
      ? 0
      : Math.round(
          (completedSkills / totalSkills) * 100
        );

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset all progress? This will return all modules to their starting state."
    );

    if (confirmed) {
      onResetProgress();
    }
  };

  return (
    <main className="module-map">
      <header className="module-map-header">
        <p className="eyebrow">
          INTERACTIVE FORMULA PRACTICE
        </p>

        <h1>Formula Quest</h1>

        <p>
          Develop practical Excel skills through guided
          practice and hands-on formula entry.
        </p>
      </header>

      <section className="overall-progress">
        <div className="overall-progress-heading">
          <span>Quest Progress</span>

          <strong>
            {completedSkills}/{totalSkills} skills
          </strong>
        </div>

        <div className="module-progress-track">
          <div
            className="module-progress-fill"
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </section>

      <section
        className="module-grid"
        aria-label="Formula Quest modules"
      >
        {modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            status={getModuleStatus(
              module,
              index
            )}
            completedCount={
              getCompletedCount(module)
            }
            onSelect={onSelectModule}
          />
        ))}
      </section>

      {completedSkills > 0 && (
        <div className="reset-progress-area">
          <button
            type="button"
            className="reset-progress-button"
            onClick={handleReset}
          >
            Reset Progress
          </button>
        </div>
      )}

      <footer className="module-map-footer">
        <div className="footer-credit">
          <span>© Olga Orlova</span>

          <span
            className="footer-divider"
            aria-hidden="true"
          >
            ·
          </span>

          <span>
            Technical Instructional Designer
          </span>
        </div>

        <p className="trademark-notice">
          Microsoft Excel is a trademark of the Microsoft
          group of companies. Formula Quest is an independent
          learning application and is not affiliated with or
          endorsed by Microsoft.
        </p>
      </footer>
    </main>
  );
}

export default ModuleMap;