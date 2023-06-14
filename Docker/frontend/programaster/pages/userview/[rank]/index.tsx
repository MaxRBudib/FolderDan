import { useRouter } from 'next/router'
import Studentview from '@/components/Studentview'
import Profesorview from '@/components/Profesorview'
import Adminview from '@/components/Adminview'
import Modulosview from '@/components/Modulosview'
import Tareaview from '@/components/Tareaview'
import Inicioview from '@/components/Inicioview'
import Anuncioview from '@/components/Anuncioview'
import AddAct from '@/components/AddAct' 
import Addgroupview from '@/components/Addgroupview'
import Creategroupview from  '@/components/Creategroupview'
import Detailview from '@/components/Detailview'
import MisGruposview from '@/components/MisGruposview'

const Post = () => {
    const router = useRouter()
    const rank = router.query.rank as string

    if (rank == 'Studentview') {
        return (
            <>
                <Studentview />
            </>
        )
    } else if (rank == 'Profesorview') {
        return (
            <>
                <Profesorview />
            </>

        )
    } else if (rank == 'Adminview') {
        return (
            <>
                <Adminview />
            </>

        )
    } else if (rank == 'Tareaview') {
        return (
            <>
                <Tareaview />
            </>

        )
    } else if (rank == 'Modulosview') {
        return (
            <>
                <Modulosview />
            </>

        )
    }
    else if (rank == 'Inicioview') {
        return (
            <>
                <Inicioview />
            </>
        )
    }

    else if (rank == 'Addgroupview') {
        return (
            <>
                <Addgroupview />
            </>

        )
    }

    else if (rank == 'AddAct') { 
        return ( 
            <>
                <AddAct/>
            </>
        )
    }

    else if (rank == 'Creategroupview') {
        return (
            <>
                <Creategroupview />
            </>

        )
    }

    else if (rank == 'Detailview') { 
        return ( 
            <>
                <Detailview/>
            </>
        )
    }

    else if (rank == 'Anuncioview') { 
        return ( 
            <>
                <Anuncioview/>
            </>
        )
    }

    else if (rank == 'MisGruposview') { 
        return ( 
            <>
                <MisGruposview/>
            </>
        )
    }
}

export default Post