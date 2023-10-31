const Help = (pageContentSanity) => {
  // Extract the 'body' array from pageContentSanity.data[1]
  const body = pageContentSanity.data[1].body;

  return (
    <section className="help-section">
      <div className="help-container">
        <div className="help-content w-full text-center p-4">
          {body.map((block, index) => {
            if (block._type === 'block') {
              if (block.style === 'h1') {
                return (
                  <h1 key={index} className="text-6xl font-black">
                    {block.children[0].text}
                  </h1>
                );
              } else if (block.style === 'h4') {
                return (
                  <h4 key={index} className="text-3xl font-black my-8">
                    {block.children[0].text}
                  </h4>
                );
              } else {
                return (
                  <p key={index} className="text-xl ">
                    {block.children[0].text}
                  </p>
                );
              }
            } else {
              return null; // Handle other block types as needed
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Help;
