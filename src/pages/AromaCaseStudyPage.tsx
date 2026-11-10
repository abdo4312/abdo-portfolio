import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import BlueprintBackground from '../components/Background/BlueprintBackground'
import ImageLightbox from '../components/shared/ImageLightbox'
import { useInView } from '../hooks/useInView'
import { useMediaQuery } from '../hooks/useMediaQuery'
import homeImage from '../assets/images/projects/aroma-case-study/01-aroma-home.png'
import beansImage from '../assets/images/projects/aroma-case-study/02-aroma-beans.png'
import boxBuilderImage from '../assets/images/projects/aroma-case-study/03-aroma-box-builder.png'
import cartImage from '../assets/images/projects/aroma-case-study/04-aroma-cart-box-details.png'
import deliveryPreviewImage from '../assets/images/projects/aroma-case-study/05-aroma-delivery-preview.png'
import './aroma-case-study.css'

interface EnlargedImage {
  src: string
  alt: string
  caption: string
}

interface CaseStudyImageProps {
  src: string
  alt: string
  caption: string
  note?: string
  priority?: boolean
  onEnlarge?: (image: EnlargedImage) => void
}

function CaseStudyImage({
  src,
  alt,
  caption,
  note,
  priority = false,
  onEnlarge,
}: CaseStudyImageProps) {
  const image = (
    <img
      src={src}
      alt={alt}
      width={1440}
      height={900}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )

  return (
    <figure className="aroma-cs__figure">
      {onEnlarge ? (
        <button
          type="button"
          className="aroma-cs__image-frame aroma-cs__image-button"
          aria-label={`Enlarge image: ${alt}`}
          onClick={() => onEnlarge({ src, alt, caption })}
        >
          {image}
          <span className="aroma-cs__zoom-icon" aria-hidden="true">
            ⤢
          </span>
        </button>
      ) : (
        <div className="aroma-cs__image-frame">{image}</div>
      )}

      <figcaption className="aroma-cs__caption">
        <span>{caption}</span>
        {note && <span className="aroma-cs__caption-note">{note}</span>}
      </figcaption>
    </figure>
  )
}

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  description: string
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="aroma-cs__section-heading">
      <p className="aroma-cs__eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p className="aroma-cs__section-description">{description}</p>
    </header>
  )
}

function useRevealOnce<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry?.isIntersecting) {
          return
        }

        setVisible(true)
        observer.unobserve(element)
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

interface RevealSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

function RevealSection({
  children,
  className = '',
  ...props
}: RevealSectionProps) {
  const { ref, visible } = useRevealOnce<HTMLElement>(0.15)

  const sectionClassName = [
    'aroma-cs__section',
    className,
    visible ? 'is-revealed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section {...props} ref={ref} className={sectionClassName}>
      {children}
    </section>
  )
}

function ShoppingFlowDiagram() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15)

  return (
    <div className="aroma-cs__flow-card">
      <p className="aroma-cs__flow-card-label">
        CHOOSE ONE SHOPPING PATH
      </p>

      <div
        ref={ref}
        className={`aroma-cs__flow-diagram${visible ? ' is-visible' : ''}`}
        role="group"
        aria-label="From the homepage, choose Explore Beans or Build a Box. Both paths lead to the cart, then Delivery Preview."
      >
        <svg
          className="aroma-cs__flow-lines"
          viewBox="0 0 1000 264"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable={false}
        >
          <defs>
            <marker
              id="aroma-flow-arrow-beans"
              className="aroma-cs__flow-arrow aroma-cs__flow-arrow--branches"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#e1b25d" />
            </marker>

            <marker
              id="aroma-flow-arrow-box"
              className="aroma-cs__flow-arrow aroma-cs__flow-arrow--branches"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#62bce8" />
            </marker>

            <marker
              id="aroma-flow-arrow-next"
              className="aroma-cs__flow-arrow aroma-cs__flow-arrow--shared"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#d5dee6" />
            </marker>
          </defs>

          <path
            className="aroma-cs__flow-line aroma-cs__flow-line--beans"
            pathLength={1}
            d="M 150 132 H 178 L 208 74 H 238"
            markerEnd="url(#aroma-flow-arrow-beans)"
          />

          <path
            className="aroma-cs__flow-line aroma-cs__flow-line--box"
            pathLength={1}
            d="M 150 132 H 178 L 208 206 H 238"
            markerEnd="url(#aroma-flow-arrow-box)"
          />

          <path
            className="aroma-cs__flow-line aroma-cs__flow-line--beans"
            pathLength={1}
            d="M 475 74 H 515 L 540 132 H 560"
            markerEnd="url(#aroma-flow-arrow-beans)"
          />

          <path
            className="aroma-cs__flow-line aroma-cs__flow-line--box"
            pathLength={1}
            d="M 475 206 H 515 L 540 132 H 560"
            markerEnd="url(#aroma-flow-arrow-box)"
          />

          <path
            className="aroma-cs__flow-line aroma-cs__flow-line--next"
            pathLength={1}
            d="M 709 132 H 790"
            markerEnd="url(#aroma-flow-arrow-next)"
          />
        </svg>

        <article className="aroma-cs__flow-node aroma-cs__flow-node--home">
          <h3>HOMEPAGE</h3>
          <p>Start here</p>
        </article>

        <article className="aroma-cs__flow-node aroma-cs__flow-node--beans">
          <h3>EXPLORE BEANS</h3>
          <p>Filter · Fast View · add to cart</p>
        </article>

        <article className="aroma-cs__flow-node aroma-cs__flow-node--box">
          <h3>BUILD A BOX</h3>
          <p>Choose capacity · coffees · quantities</p>
        </article>

        <article className="aroma-cs__flow-node aroma-cs__flow-node--cart">
          <h3>CART</h3>
          <p>Review &amp; edit</p>
        </article>

        <article className="aroma-cs__flow-node aroma-cs__flow-node--delivery">
          <h3>DELIVERY PREVIEW</h3>
          <p>Demo only · no real order</p>
        </article>
      </div>
    </div>
  )
}

function AromaCaseStudyPage() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [enlarged, setEnlarged] = useState<EnlargedImage | null>(null)
  const enlarge = desktop ? undefined : setEnlarged

  return (
    <>
      <BlueprintBackground />
      <Navbar />

      <main className="aroma-cs">
        <div className="aroma-cs__container">
          <section className="aroma-cs__hero" aria-labelledby="aroma-cs-title">
            <div className="aroma-cs__hero-copy">
              <p className="aroma-cs__eyebrow">A-03 / PERSONAL PROJECT</p>

              <h1 id="aroma-cs-title">
                Aroma
                <span>Corner</span>
              </h1>

              <p className="aroma-cs__hero-lead">
                A warm coffee storefront with two ways to shop.
              </p>

              <p className="aroma-cs__hero-description">
                Explore individual beans or build a box. Both paths meet in the
                cart before a delivery-preview step.
              </p>

              <div className="aroma-cs__tags">
                <span className="aroma-cs__tag aroma-cs__tag--accent">
                  AI-ASSISTED · HUMAN-DIRECTED
                </span>
                <span className="aroma-cs__tag">FRONTEND SHOWCASE</span>
              </div>

              <dl className="aroma-cs__meta">
                <div>
                  <dt>PROJECT</dt>
                  <dd>Personal learning project</dd>
                </div>

                <div>
                  <dt>CHECKOUT</dt>
                  <dd>Delivery preview · demo only</dd>
                </div>
              </dl>

              <a className="aroma-cs__text-link" href="#shopping-flow">
                Explore the shopping flow <span aria-hidden="true">↓</span>
              </a>
            </div>

            <CaseStudyImage
              src={homeImage}
              alt="Aroma Corner homepage showing the storefront and its shopping entry points"
              caption="Homepage — the storefront and its shopping entry points."
              note="Visible ratings and promotional figures are mock storefront content."
              priority
              onEnlarge={enlarge}
            />
          </section>

          <RevealSection
            className="aroma-cs__section--flow"
            id="shopping-flow"
            aria-labelledby="shopping-flow-heading"
          >
            <SectionHeading
              id="shopping-flow-heading"
              eyebrow="01 / THE SHOPPING FLOW"
              title="Two routes. One shared cart."
              description="Choose either route from the homepage; both converge at the cart before delivery preview."
            />

            <ShoppingFlowDiagram />

            <p className="aroma-cs__inline-note">
              The two shopping paths are alternatives, not sequential steps.
            </p>
          </RevealSection>

          <RevealSection
            id="explore-beans"
            aria-labelledby="explore-beans-heading"
          >
            <SectionHeading
              id="explore-beans-heading"
              eyebrow="02 / EXPLORE BEANS"
              title="Browse the beans."
              description="Filters for roast, price, and origin change the products shown in the list."
            />

            <div className="aroma-cs__split-grid">
              <CaseStudyImage
                src={beansImage}
                alt="Aroma Corner bean shop showing product cards and filtering controls"
                caption="Bean shop — products and filters."
                note="Ratings and promotional figures in the storefront are mock content."
                onEnlarge={enlarge}
              />

              <div className="aroma-cs__copy">
                <ul className="aroma-cs__feature-list">
                  <li>
                    <strong>Filters</strong>
                    <span>
                      Roast, price, and origin filters update the displayed
                      products.
                    </span>
                  </li>

                  <li>
                    <strong>Fast View</strong>
                    <span>
                      Review a product, adjust its quantity, and add it to the
                      cart.
                    </span>
                  </li>

                  <li>
                    <strong>Product actions</strong>
                    <span>
                      The plus button adds a product directly; its image opens
                      the full product page.
                    </span>
                  </li>

                  <li>
                    <strong>Cart feedback</strong>
                    <span>
                      The cart count confirms an addition. Adding the same
                      product again increases its quantity; there is no toast
                      message.
                    </span>
                  </li>
                </ul>

                <aside className="aroma-cs__callout">
                  <p className="aroma-cs__callout-label">
                    UX NOTE / PRODUCT DETAILS
                  </p>
                  <p>
                    The size control on the product details page currently
                    changes visually only. It does not update the price or the
                    cart item.
                  </p>
                </aside>
              </div>
            </div>
          </RevealSection>

          <RevealSection
            id="build-your-box"
            aria-labelledby="build-your-box-heading"
          >
            <SectionHeading
              id="build-your-box-heading"
              eyebrow="03 / BUILD YOUR BOX"
              title="Build a box around your taste."
              description="Choose a box capacity, then select the coffees and quantities to include."
            />

            <div className="aroma-cs__split-grid aroma-cs__split-grid--copy-first">
              <div className="aroma-cs__copy">
                <p>
                  The Box Builder supports boxes for 3, 6, or 12 items. A
                  configured box appears as one item in the cart, where its
                  contents can be expanded and reviewed.
                </p>

                <div
                  className="aroma-cs__capacities"
                  aria-label="Box capacities"
                >
                  <div>
                    <strong>3</strong>
                    <span>ITEMS</span>
                  </div>

                  <div>
                    <strong>6</strong>
                    <span>ITEMS</span>
                  </div>

                  <div>
                    <strong>12</strong>
                    <span>ITEMS</span>
                  </div>
                </div>

                <aside className="aroma-cs__callout">
                  <p className="aroma-cs__callout-label">MOCK VALUES</p>
                  <p>
                    Box prices and discounts shown in the interface are
                    illustrative test data, not live offers.
                  </p>
                </aside>
              </div>

              <CaseStudyImage
                src={boxBuilderImage}
                alt="Aroma Corner Box Builder with an Explorer Box filled with six items"
                caption="Box Builder — an Explorer Box configured with six items."
                note="Displayed prices and discounts are mock values."
                onEnlarge={enlarge}
              />
            </div>
          </RevealSection>

          <RevealSection
            id="cart-and-delivery"
            aria-labelledby="cart-and-delivery-heading"
          >
            <SectionHeading
              id="cart-and-delivery-heading"
              eyebrow="04 / CART & DELIVERY PREVIEW"
              title="Review first. Preview delivery next."
              description="Both shopping paths meet in the cart before the demo-only delivery step."
            />

            <div className="aroma-cs__cart-grid">
              <article className="aroma-cs__cart-card">
                <CaseStudyImage
                  src={cartImage}
                  alt="Aroma Corner cart with one box and its contents expanded"
                  caption="Cart — one box with its contents open for review."
                  onEnlarge={enlarge}
                />

                <h3>Cart / Review &amp; adjust</h3>
                <p>
                  Review items and totals, change quantities, remove or clear
                  items, and expand a box to inspect its contents.
                </p>
              </article>

              <article className="aroma-cs__cart-card">
                <CaseStudyImage
                  src={deliveryPreviewImage}
                  alt="Aroma Corner delivery preview form with no personal information entered"
                  caption="Delivery Preview — an empty demo form."
                  note="No order is submitted and no payment is processed."
                  onEnlarge={enlarge}
                />

                <h3>Delivery Preview / Demo only</h3>
                <p>
                  The form previews delivery details and payment-method
                  selection. It does not place an order or process a payment.
                </p>
              </article>
            </div>

            <aside className="aroma-cs__notice">
              <span aria-hidden="true">●</span>
              <p>
                This is a frontend preview flow—not a live checkout, payment,
                or order-confirmation system.
              </p>
            </aside>
          </RevealSection>

          <RevealSection
            id="role-and-scope"
            aria-labelledby="role-and-scope-heading"
          >
            <SectionHeading
              id="role-and-scope-heading"
              eyebrow="05 / ROLE & PROJECT SCOPE"
              title="A learning project with clear boundaries."
              description="The case study focuses on the shopping experience and product decisions—not commercial results."
            />

            <div className="aroma-cs__role-grid">
              <article className="aroma-cs__role-card">
                <span className="aroma-cs__tag aroma-cs__tag--accent">
                  AI-ASSISTED · HUMAN-DIRECTED
                </span>

                <h3>My role: product &amp; UX direction</h3>

                <p>
                  I set the product and visual direction, discussed the shopping
                  experience before implementation, and reviewed the result in
                  the browser and source files.
                </p>

                <p>
                  AI proposed the Box Builder. I chose to include it after
                  considering how it could make the shopping experience more
                  distinctive, then guided UX refinements such as expandable
                  box contents in the cart.
                </p>

                <p className="aroma-cs__role-footnote">
                  AI generated the implementation; my contribution was
                  direction, evaluation, and UX refinement.
                </p>
              </article>

              <aside className="aroma-cs__scope-card">
                <p className="aroma-cs__eyebrow">PROJECT BOUNDARIES</p>

                <ul>
                  <li>Personal learning project</li>
                  <li>Frontend showcase with mock data</li>
                  <li>No real order or payment flow</li>
                  <li>No sales or user-testing claims</li>
                </ul>

                <p className="aroma-cs__scope-note">
                  Not presented as a launched store or as evidence of
                  commercial outcomes.
                </p>
              </aside>
            </div>
          </RevealSection>

          <footer className="aroma-cs__footer">
            {!desktop && (
              <Link to="/work/road-to-islam">
                <span aria-hidden="true">←</span> Previous: Road to Islam
              </Link>
            )}

            <Link to="/#work">
              <span aria-hidden="true">←</span> Back to featured work
            </Link>

            <span className="aroma-cs__footer-label">
              AROMA CORNER · CASE STUDY
            </span>
          </footer>
        </div>
      </main>

      {enlarged && (
        <ImageLightbox
          src={enlarged.src}
          alt={enlarged.alt}
          caption={enlarged.caption}
          open
          onClose={() => setEnlarged(null)}
        />
      )}
    </>
  )
}

export default AromaCaseStudyPage
