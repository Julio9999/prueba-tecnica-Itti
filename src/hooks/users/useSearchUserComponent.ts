import { useUsersQuery } from "..";
import { UserOption } from "../../interfaces";
import { useUsersStore } from "../../stores";

export const useSearchUserComponent = () => {
    const { data, queryClient } = useUsersQuery()

    const { selectedUser, setSelectedUser } = useUsersStore()


    const results = data?.data?.results ?? [];


    const usersOptions = results.map(user => ({
        label: user.name.first,
        id: user.location.coordinates
    }))


    const handleChange = (e: React.SyntheticEvent<Element, Event>, value: UserOption) => {
        setSelectedUser(value)
    }

    const handleRefreshUsers = () => {
        queryClient.invalidateQueries({queryKey: ['users']});
    }

    return {
        handleChange,
        usersOptions,
        selectedUser,
        handleRefreshUsers
    }
}