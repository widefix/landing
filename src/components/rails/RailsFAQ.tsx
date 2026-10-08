const questions = [
  {
    question: 'Can you take over an application if our previous developer has left?',
    answer: 'Yes. We specialize in taking over existing Rails applications, including projects where the original developer or agency is no longer available. We start by understanding the codebase, infrastructure, and business priorities.',
    detail: 'We work with the repository, documentation, and access you have, identify missing information, and agree on how to recover it. If the outgoing developer is available, we coordinate the handover with them.',
  },
  {
    question: 'Do I need to know exactly what needs to be fixed?',
    answer: 'No. Bring us the problem and what it means for your business. We investigate the application, identify the technical causes, and agree on priorities with you. You do not need to turn every concern into a developer ticket or manage the technical solution yourself.',
    detail: 'Whether the issue is recurring production failures, slow development, or an integration that no longer works reliably, we turn the findings into a practical plan with clear responsibilities and next steps.',
  },
  {
    question: 'Will you rewrite my existing application?',
    answer: 'We start with what already works and favor targeted fixes, gradual upgrades, and incremental improvements. A takeover does not require a rewrite. If a larger change is justified, we explain the tradeoffs and agree on the approach with you first.',
    detail: 'Our work can include local refactoring, staged migrations, and interface improvements that preserve the application your customers already use.',
  },
  {
    question: 'What does ongoing Rails maintenance include?',
    answer: 'It can include Ruby and Rails upgrades, dependency updates, production fixes, performance improvements, background jobs, monitoring, security, infrastructure, and integrations. We also build new features, prioritizing the work around your application’s condition and business goals.',
    detail: 'We agree on the scope, priorities, and communication rhythm so maintenance and product development move forward together.',
  },
  {
    question: 'Can you work alongside our existing development team?',
    answer: 'Yes. We can bring Rails expertise and technical ownership to support your existing team. We agree on responsibilities, coordinate changes, and help with difficult parts of the application while your team continues its work.',
    detail: 'This can include upgrades, performance work, integrations, architecture decisions, and coordination with teams building other parts of the product.',
  },
  {
    question: 'How do you start working with an unfamiliar Rails application?',
    answer: 'We begin with your business priorities, then review the codebase, infrastructure, deployments, tests, and integrations. We map the risks, agree on a handover and the first priorities, and add test coverage where needed before making changes.',
    detail: 'The first plan addresses urgent production issues and identifies the maintenance, upgrade, and feature work needed to keep the product moving.',
  },
];

export default function RailsFAQ({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="rails-section rails-tinted rails-faq-section" id="faq" aria-labelledby="rails-faq-title">
      <div className="inner rails-faq-grid">
        <div className="rails-faq-heading">
          <p className="rails-eyebrow">Before we take over</p>
          <h2 id="rails-faq-title">Questions about your existing Rails application</h2>
          <p className="rails-intro">You can bring us the problem. We&apos;ll help you understand what the application needs and take responsibility for the next steps.</p>
        </div>
        <div className="rails-faq">
          {questions.map(({ question, answer, detail }) => (
            <details key={question}>
              <summary>{question}</summary>
              <div className="rails-faq-answer"><p>{answer}</p>{detailed && <p>{detail}</p>}</div>
            </details>
          ))}
          {detailed && <details><summary>What should I bring to the first call?</summary><div className="rails-faq-answer"><p>Tell us what the application does, who currently maintains it, and what is most urgent. Share the repository, documentation, and infrastructure information you have when we agree on the review. You do not need to prepare a technical audit before talking to us.</p></div></details>}
        </div>
      </div>
    </section>
  );
}
