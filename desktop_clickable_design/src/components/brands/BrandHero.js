import PlaceholderImage from '../common/PlaceholderImage';

function BrandHero({ name, description }) {
  return (
    <section className="relative w-full">
      <PlaceholderImage ratio="1440 / 375" label={`${name} — brand banner`} className="w-full" />
      <div
        className="absolute inset-0 flex flex-col items-end justify-center gap-4 px-6 text-right text-white sm:max-w-[520px] sm:px-[6%] sm:ml-auto"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
      >
        <h1 className="m-0 font-serif text-3xl font-bold sm:text-4xl">{name}</h1>
        <p className="m-0 text-sm leading-relaxed sm:text-[15px]">{description}</p>
      </div>
    </section>
  );
}

export default BrandHero;
