import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { Car } from './interfaces/car.interfaces';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    
    private cars: Car[] =  [ 
        // {
        //     id:uuid(),
        //     brand:'Toyota',
        //     model: 'Corolla' 
        // }
    ]

    findAll(){
        return this.cars
    }

    findOneById(id: string){
        const car = this.cars.find(v => v.id === id)
        if(!car)
            throw new NotFoundException(`Car with id '${id}' not found`)
        return car
    }

    create({brand, model}: CreateCarDto){
        const newCar: Car ={
            id: uuid(),
            brand,
            model
        } 
        this.cars.push(newCar)
        return newCar;        

    }

    update(id, updateCarDto:UpdateCarDto){

        let cardb = this.findOneById(id)

        if(updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException('Car id is not valid')

        this.cars = this.cars.map(car => {
            if(car.id === id){
                cardb = { ...cardb, ...updateCarDto,id}
                return cardb
            }
            return car
        })
        return cardb
    }

    delete(id: string){
        const  cars = this.findOneById(id)
        this.cars = this.cars.filter(car => car.id !== id)
    }

    fillCarsWithSeedData(cars: Car[]){
        this.cars = cars;
    }
        

}
