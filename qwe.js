console.log(new Array(200).fill(null).map((_, i) => `export const fetchProfile${i+200} = (client: Client) => {
    return;
}`).join('\n'))