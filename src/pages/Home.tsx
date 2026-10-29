import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import Icon from '../components/Icon';
import Seo from '../components/Seo';
import { experience } from '../data/experience';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';

export default function Home() {
  return (
    <>
      <Seo
        title="Jaga"
        description="Jaga is a backend engineer with 6 years of experience building distributed systems, real-time infrastructure, and scalable TypeScript services."
        path="/"
      />
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero__main">
          <p className="eyebrow">Backend engineer · Coimbatore, India</p>
          <h1 id="hero-title">Hey, I’m <span>Jaga.</span></h1>
          <p className="hero__intro">
            A backend engineer with <strong>6 years of experience</strong> building reliable services,
            real-time infrastructure, and distributed systems with TypeScript and Node.js.
          </p>
          <p className="hero__supporting">
            I work from architecture through production: service boundaries, APIs, data flow,
            deployments, and the operational details that keep systems understandable as they grow.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#work">
              Explore my work <Icon name="arrow-down" size={17} />
            </a>
            <a
              className="button button--secondary"
              href="https://github.com/jaga-live"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" size={17} /> GitHub
            </a>
            <a className="button button--secondary" href="mailto:jagadheesh6@gmail.com">
              <Icon name="mail" size={17} /> Get in touch
            </a>
          </div>
        </div>

        <aside className="hero__brief" aria-label="Profile summary">
          <p className="hero__brief-label">At a glance</p>
          <p className="hero__availability">
            <span>Availability</span>
            <strong>{profile.availabilityNote}</strong>
          </p>
          <dl>
            <div><dt>Experience</dt><dd>6 years</dd></div>
            <div><dt>Specialty</dt><dd>Backend platforms & distributed systems</dd></div>
            <div><dt>Current work</dt><dd>Healthcare services & product engineering</dd></div>
            <div><dt>Time zone</dt><dd>{profile.timezone}</dd></div>
          </dl>
        </aside>
      </section>

      <section className="work-section section-shell" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div><p className="eyebrow">Selected projects</p><h2 id="work-title">Built around real constraints.</h2></div>
          <p>Production scale, clear service boundaries, and the decisions behind work I have built and operated.</p>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className={`project-row project-row--${project.id}`} key={project.id}>
              <div className="project-row__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="project-row__content">
                <div className="project-row__titleline">
                  <div className={`project-mark project-mark--${project.id}`} aria-hidden="true">
                    {project.logo ? (
                      <img src={project.logo} alt="" loading="lazy" />
                    ) : project.id === 'nescord' ? (
                      <BrandLogo name="npm" icon="npm" />
                    ) : (
                      <span>{project.mark}</span>
                    )}
                  </div>
                  <div>
                    <p>{project.kicker}</p>
                    <h3>
                      {project.detailPath ? (
                        <Link to={project.detailPath}>{project.title}</Link>
                      ) : (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          {project.title}
                        </a>
                      )}
                    </h3>
                  </div>
                  <span className="project-status">{project.status}</span>
                </div>

                <div className="project-row__body">
                  <div>
                    <p className="project-row__description">{project.description}</p>
                    <p className="project-row__contribution"><strong>My role:</strong> {project.contribution}</p>
                  </div>
                  <dl className="project-evidence">
                    {project.evidence.map((item) => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt></div>)}
                  </dl>
                </div>

                <div className="project-row__footer">
                  <ul aria-label={`${project.title} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  <div className="project-row__links">
                    {project.detailPath && (
                      <Link className="project-btn project-btn--case-study" to={project.detailPath}>
                        <span>Read case study</span>
                        <Icon name="arrow-up-right" size={15} />
                      </Link>
                    )}
                    {project.githubUrl && (
                      <a
                        className={`project-btn project-btn--github${!project.detailPath ? ' project-btn--primary' : ''}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon name="github" size={16} />
                        <span>View on GitHub</span>
                        <Icon name="arrow-up-right" size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        className="project-btn project-btn--live"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon name="globe" size={15} />
                        <span>Live site</span>
                        <Icon name="arrow-up-right" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities section-shell" id="stack" aria-labelledby="stack-title">
        <div className="section-heading">
          <div><p className="eyebrow">Tech stack</p><h2 id="stack-title">Tools, grouped by purpose.</h2></div>
          <p>Languages stay languages. Protocols, infrastructure, data, and product tools each have their own place.</p>
        </div>
        <div className="capability-list">
          {skillGroups.map((group) => (
            <article className="capability-row" key={group.label}>
              <div><h3>{group.label}</h3><p>{group.description}</p></div>
              <ul>{group.items.map((item) => <li key={item.name}><BrandLogo name={item.name} icon={item.icon} /><span>{item.name}</span></li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="experience section-shell" id="experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <div><p className="eyebrow">Work experience</p><h2 id="experience-title">Six years of shipping software.</h2></div>
          <p>What I owned, the products behind the role, and the technologies used to run them.</p>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-item" key={`${item.company}-${item.start}`}>
              <div className="experience-item__meta"><span>{String(index + 1).padStart(2, '0')}</span><p>{item.period ?? `${item.start} to ${item.current ? 'present' : item.end}`}</p></div>
              <div className="experience-item__body">
                <div className="experience-item__heading">
                  <div><h3>{item.company}</h3><p>{item.role}</p></div>
                  <span>{item.current ? 'Current role' : 'Earlier experience'}</span>
                </div>
                <p className="experience-item__summary">{item.summary}</p>
                {item.keywords && <p className="experience-item__keywords"><strong>{item.keywords.join(' · ')}</strong></p>}
                {item.projects && (
                  <div className="experience-projects">
                    {item.projects.map((project) => (
                      <div key={project.name}>
                        <div className="experience-project__heading">
                          <h4>{project.name}</h4>
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noreferrer">
                              Visit project <Icon name="arrow-up-right" size={14} />
                            </a>
                          )}
                        </div>
                        <p>{project.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {item.bullets && <ul className="experience-bullets">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {item.tech && <ul className="experience-tech" aria-label={`${item.company} technologies`}>{item.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <div><p className="eyebrow">How I work</p><h2 id="about-title">Close to both the code and production.</h2></div>
        <div className="about__copy">
          <p>{profile.about}</p>
          <p>I like clear ownership, direct communication, and designs that are easy for the next engineer to understand.</p>
        </div>
      </section>

      <section className="contact-band section-shell" aria-labelledby="contact-title">
        <p className="eyebrow">Let’s talk</p>
        <div><h2 id="contact-title">Looking for a backend engineer who owns the whole path?</h2><a href="mailto:jagadheesh6@gmail.com">jagadheesh6@gmail.com <Icon name="arrow-up-right" size={24} /></a></div>
      </section>
    </>
  );
}
