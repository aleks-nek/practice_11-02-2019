package com.epolsoft.practice.company.client;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Component
public interface ClientMapper {
    class Reference {
        static final String COMPANY = "com.epolsoft.practice.company.CompanyMapper.findById";
    }

    @Insert("insert into client (name, phone, company_id, email, address, comment, is_conflicted) " +
            "values (#{name}, #{phone}, #{company.id}, #{email}, #{address}, #{comment}, #{isConflicted})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Client client);

    @Select("select * from client")
    @Results(id = "clientMapper", value = {
        @Result(property = "isConflicted", column = "is_conflicted"),
        @Result(property = "company", column = "company_id", one = @One(select = Reference.COMPANY))
    })
    List<Client> selectAll();

    @Select("select * from client where company_id=#{id}")
    @ResultMap(value = "clientMapper")
    List<Client> findAllWithCompanyId(Long id);

    @Select("select * from client where id=#{id}")
    @ResultMap(value = "clientMapper")
    Client findById(Long id);

    @Select("select * from client where name=#{name}")
    @ResultMap(value = "clientMapper")
    Client findByName(String name);
}
