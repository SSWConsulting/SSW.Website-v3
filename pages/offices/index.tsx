import { Layout } from "../../components/layout";
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import { Container } from "../../components/util/container";
import MicrosoftPanel from "../../components/offices/microsoftPanel";
import TestimonialPanel from "../../components/offices/testimonialPanel";

export default function OfficeIndex(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const offices = data.officesConnection.edges.map(edge => edge.node);

  return (
    <Layout>
      <Container className="flex-1 gap-8 pt-2 md:grid md:grid-cols-7">
        <div className="md:col-span-5">
          {offices.map(office => 
          <div key={office.addressLocality} className="mb-10 block">
            <h2 className="mt-0 text-sswRed">{`${office.addressLocality} | ${office.addressCountry}`}</h2>
            {office.thumbnail 
              ? <Image 
                  className="float-left mr-4 pb-3" 
                  src={office.thumbnail} 
                  width={115} 
                  height={115} 
                  alt="Office Thumbnail" 
                /> 
              : <></>}

            <p className="block max-sm:clear-left">{office.streetAddress}<br/>
              {office.suburb}, {office.addressRegion} {office.postalCode}
            </p>
            
            <p className="block max-sm:clear-left"><strong>{office.phone}</strong></p>

            <p className="block max-sm:clear-left"><a href={office.url}>Learn more about our {office.addressLocality} office</a></p>
            <p className="block max-sm:clear-left"><a href="">Directions to SSW {office.addressLocality}</a></p>
          </div>)}
          <hr className="my-3"/>
          <div className="border-2 bg-gray-100 px-4 py-2">
            <p>Our staff are ready to work remotely for any country globally. We have worked for clients from the 
            <strong>USA, Canada, the UK</strong>, and even European countries, such as <strong>France, Germany</strong>
            , and as far north as <strong>Sweden</strong>.</p>
          </div>

          <br/>
          <p>If you require any further information, don't hesitate to <a href="mailto:info@ssw.com.au">contact us.</a></p>
          <br/>
          <p>Visit our worldwide website: <a href="https://ssw.com/">ssw.com.</a></p>
        </div>

        <div className="prose prose-h3:text-sswRed md:col-span-2">
          <h3>SSW Offices</h3>
          <ul>
            {offices.map(office => <li key={office.addressLocality}>{office.addressLocality}</li>)}
          </ul>

          <MicrosoftPanel />
          <TestimonialPanel testimonial={props.testimonial} />
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.officesConnection();

  const testimonialResult = await client.queries.allTestimonialsQuery();
  const testimonials = testimonialResult.data.testimonialsConnection.Testimonials;
  const testimonial = testimonials[Math.floor(Math.random() * testimonials.length)].Testimonial;

  return { 
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonial: testimonial
    }
  };
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
