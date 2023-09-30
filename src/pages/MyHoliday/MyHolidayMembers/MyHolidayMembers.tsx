type MyHolidayMembersProps = {
  name: string;
  email: string;
  srcImage: string;
};

function MyHolidayMembers({ name, email, srcImage }: MyHolidayMembersProps) {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={srcImage} width="40" height="40" alt="Philip Harbach" />
          </div>
          <div className="font-medium text-gray-800">{name}</div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{email}</div>
      </td>
    </tr>
  );
}

export default MyHolidayMembers;
