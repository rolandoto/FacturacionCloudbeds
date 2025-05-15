import React from "react";
import EmailTableHeader from "../EmailTableHeader/EmailTableHeader";
import EmailTableRow from "../EmailTableRow/EmailTableRow";

const EmailTable =({ListEmail}) =>{

    return <>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <EmailTableHeader />
                    <tbody>
                        {ListEmail.map((itemEmail) =>(
                            <EmailTableRow  itemEmail={itemEmail}  />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
}

export default EmailTable