export async function load(SeverLoadEvent){
    const {fetch} = SeverLoadEvent
    const {params} = SeverLoadEvent
    const {id} = params
    const response = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools/${id}`)
    const data = await response.json()
    return {data}
}

