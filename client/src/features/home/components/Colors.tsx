// const getColors = async () => {
// const palette = await axios
//   .get(`/explore/colors/?url=${url}`)
//   .then((data) => data.data);

// setPalette(palette);
// }

export const Colors = () => {
  // const url =
  //   "https://lh3.googleusercontent.com/qQa3j1Lk786TS9dbFk5x3z783Xg8XcIxe9Dd2c_htHCBiiFTG9Azj6nB3cNb4lO4VKMZ3UagxrchQw=w2880-h1800-p-l90-rj";
  // const { data: palette } = useQuery<Palette>({
  //   queryFn: async () => (await axios.get(`/explore/colors/?url=${url}`)).data,
  //   queryKey: ["a", url],
  // });
  // const { sortColors, colors } = useColorSort(palette?.colors);
  // if (!palette) return;
  // // console.log(combineSort(palette?.colors || [], "intensity", "lightness"));
  // return (
  //   <div>
  //     <img width="256" src={url} />
  //     {Boolean(palette) && (
  //       <>
  //         <Stack direction="row" gap={1} mt={5}>
  //           {colors.map((color, i) => (
  //             <Block key={i} color={color} />
  //           ))}
  //         </Stack>
  //         <Stack direction="row" gap={1} mt={5}>
  //           {sortColors([
  //             "lightness",
  //             "intensity",
  //             "saturation",
  //             "hue",
  //             "area",
  //           ]).map((color, i) => (
  //             <Block key={i} color={color} />
  //           ))}
  //         </Stack>
  //       </>
  //     )}
  //   </div>
  // );
};
