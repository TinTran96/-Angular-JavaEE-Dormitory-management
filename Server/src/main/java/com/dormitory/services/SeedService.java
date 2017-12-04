package com.dormitory.services;

import com.dormitory.entities.*;
import com.dormitory.entities.Class;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.Date;

@Singleton
@Startup
public class SeedService {
    @EJB
    private FloorService floorService;
    @EJB
    private UserService userService;
    @EJB
    private ClassService classService;
    @EJB
    private ClubService clubService;
    @EJB
    private RoomService roomService;
    @EJB
    private StudentService studentService;
    @EJB
    private TemporaryAbsencesService temp_absService;
    @EJB
    private BuildingService buildingService;


    @PostConstruct
    public void init() {
        generateBuilding();
        generateFloor();
        User admin = new User();
        admin.setEmail("admin");
        admin.setPassword("123");

        userService.add(admin);

        this.generateClub();
        this.generateRoom();
        this.generateClass();
        this.generateStudent();
        this.generateTmpAbs();


    }
    public void generateFloor()
    {
        Floor f1 = new Floor();
        f1.setId("A1");
        f1.setBuildingId("A");
        Floor f2 = new Floor();
        f2.setId("B1");
        f2.setBuildingId("B");
        floorService.add(f1);
        floorService.add(f2);

    }
    public void generateBuilding()
    {
        Building b1 = new Building();
        b1.setId("A");
        Building b2 = new Building();
        b2.setId("B");
        buildingService.add(b1);
        buildingService.add(b2);


    }

    public void generateTmpAbs()
    {
        Temporaryabsences tmp1 = new Temporaryabsences();
        tmp1.setNumofabsences(4);
        tmp1.setReason("Về quê");
        tmp1.setStartdate(new Date(17,11,29));
        tmp1.setStudentId("51403147");
        temp_absService.add(tmp1);
    }
    public void generateClub()
    {
        Club c1 = new Club();
        c1.setId("CLB001");
        c1.setName("Bơi lội");
        clubService.add(c1);
        Club c2 = new Club();
        c2.setId("CLB002");
        c2.setName("Bóng đá");
        clubService.add(c2);
        Club c3 = new Club();
        c3.setId("CLB003");
        c3.setName("Văn học");
        clubService.add(c3);
        Club c4 = new Club();
        c4.setId("CLB004");
        c4.setName("Văn nghệ");
        clubService.add(c4);

    }
    public void  generateRoom()
    {
        Room r1 = new Room();
        r1.setFloorId("A1");
        r1.setId("A01");
        r1.setCapacity(8);
        roomService.add(r1);
        Room r2 = new Room();
        r2.setFloorId("B1");
        r2.setId("A02");
        r2.setCapacity(8);
        roomService.add(r2);
    }

    public void generateClass()
    {
        Class class1 = new Class();
        class1.setId("14050301");
        class1.setFacultyId("K001");
        classService.add(class1);
        Class class2 = new Class();
        class2.setId("14050302");
        class2.setFacultyId("K002");
        classService.add(class2);

    }
    public void generateStudent()
    {
        Student student1 = new Student();
        student1.setId("51403147");
        student1.setAddress("183 3 thang 2");
        student1.setClassId("14050301");
        student1.setClubId("CLB001");
        student1.setCourse(18);
        student1.setDob(new Date(96,01,30));
        student1.setGender(1);
        student1.setName("Trần Bảo Tín");
        student1.setNation("Việt Nam");
        student1.setPhone("01638620648");
        student1.setPob("Hồ Chí Minh");
        student1.setReligion("Phật");
        student1.setSsn("025443755");
        studentService.add(student1);

        Student student2 = new Student();
        student2.setId("51403148");
        student2.setAddress("189 3 thang 2");
        student2.setClassId("14050302");
        student2.setClubId("CLB001");
        student2.setCourse(18);
        student2.setDob(new Date(96,12,12));
        student2.setGender(0);
        student2.setName("Trần Văn A");
        student2.setNation("Việt Nam");
        student2.setPhone("01638645678");
        student2.setPob("Hồ Chí Minh");
        student2.setReligion("Phật");
        student2.setSsn("025443799");
        studentService.add(student2);


    }
}
