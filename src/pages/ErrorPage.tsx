import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface ErrorPageProps {
    code?: string; 
    title?: string; 
    message?: string; 
}

export default function ErrorPage({
    code = "404",
    title = "Page Not Found",
    message = "Sorry, the page you are looking for does not exist."
}: ErrorPageProps) {
    return (
        <div className="grid place-content-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <Card className="max-w-md w-full text-center shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-6xl font-extrabold text-red-600 mb-2">{code}</CardTitle>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                        {message}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                        Please contact your administrator if you believe this is an error.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link to="/">
                        <Button>
                            Go to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
