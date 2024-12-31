import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"
import { ISMECard } from "@/lib/db/definitions"

export default function Reservation({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Reservation process'
            description={'It captures the understanding of respondents about the reservation process.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.reservation} 
            baseline = {baseline.quality.reservation} 
        />
    )
       
}
