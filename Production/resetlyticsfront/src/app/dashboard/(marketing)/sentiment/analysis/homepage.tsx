
import SentimentCard from "@/components/ui/dashboard/visuals/sentimentcard"

export default function Sentiment({ sme }: { sme: any }) {

    return (
        <SentimentCard
            name='Sentiment analysis'
            description={'Customers perception based on written commentaries.'}
            sme={sme.organization} 
            sentiment={sme.sentiment} 
            words_cloud={sme.words_cloud} 
        />
    )
       
}
