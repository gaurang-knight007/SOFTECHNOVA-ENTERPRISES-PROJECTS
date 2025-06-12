import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/store/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Software Engineer"
]

const CategoryCarousel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }

    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-15'>
                <CarouselContent >
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                            <Button onClick={() => submitHandler(cat)} variant='outline' className='rounded-full'>{cat}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel