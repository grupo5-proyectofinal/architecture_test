export async function load(SeverLoadEvent){
    const {fetch} = SeverLoadEvent
    // const response = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools/${id}/`)
    // const data = await response.json()
    // return {data}
    const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/categories/');
    const data = await response.json();
    return {data}    
}
